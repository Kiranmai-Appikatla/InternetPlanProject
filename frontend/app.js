const form = document.getElementById("plan-form");
const formTitle = document.getElementById("form-title");
const message = document.getElementById("message");
const tbody = document.getElementById("plans");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const idInput = document.getElementById("plan-id");

let plans = [];
let loadToken = 0;

function showMessage(text, isError) {
  message.textContent = text;
  message.classList.toggle("error", Boolean(isError));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resetForm() {
  form.reset();
  idInput.value = "";
  document.getElementById("active").checked = true;
  formTitle.textContent = "Add a plan";
  submitBtn.textContent = "Add plan";
  cancelBtn.hidden = true;
}

function render() {
  if (!plans.length) {
    tbody.innerHTML = '<tr><td class="empty" colspan="6">No plans yet.</td></tr>';
    return;
  }

  tbody.innerHTML = plans.map((plan) => `
    <tr>
      <td>${plan.id}</td>
      <td>${escapeHtml(plan.planName)}</td>
      <td>${plan.speedMbps} Mbps</td>
      <td>$${Number(plan.monthlyFee).toFixed(2)}</td>
      <td>${plan.active ? "Yes" : "No"}</td>
      <td>
        <button type="button" class="secondary" data-action="edit" data-id="${plan.id}">Edit</button>
        <button type="button" class="danger" data-action="delete" data-id="${plan.id}">Delete</button>
      </td>
    </tr>
  `).join("");
}

async function loadPlans(attempt = 0) {
  const token = attempt === 0 ? ++loadToken : loadToken;
  try {
    const response = await fetch("/InternetPlan/DisplayAll");
    if (!response.ok) {
      throw new Error("Could not load plans");
    }
    if (token !== loadToken) {
      return;
    }
    plans = await response.json();
    render();
    if (message.textContent === "Waiting for the API...") {
      showMessage("");
    }
  } catch (error) {
    if (token !== loadToken) {
      return;
    }
    if (attempt < 8) {
      showMessage("Waiting for the API...");
      setTimeout(() => loadPlans(attempt + 1), 1500);
      return;
    }
    showMessage("Could not load plans.", true);
    tbody.innerHTML = '<tr><td class="empty" colspan="6">Plans are unavailable.</td></tr>';
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = idInput.value;
  const body = {
    planName: document.getElementById("plan-name").value.trim(),
    speedMbps: Number(document.getElementById("speed").value),
    monthlyFee: Number(document.getElementById("fee").value),
    active: document.getElementById("active").checked
  };
  if (id) {
    body.id = Number(id);
  }

  const response = await fetch(id ? "/InternetPlan/Update" : "/InternetPlan/Add", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  const saved = text ? JSON.parse(text) : null;
  if (!response.ok || !saved) {
    showMessage(id ? "That plan was not found." : "Could not save the plan.", true);
    return;
  }

  showMessage(id ? "Plan updated." : "Plan added.");
  resetForm();
  await loadPlans();
});

cancelBtn.addEventListener("click", () => {
  resetForm();
  showMessage("");
});

tbody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const plan = plans.find((item) => String(item.id) === button.dataset.id);
  if (!plan) {
    return;
  }

  if (button.dataset.action === "edit") {
    idInput.value = plan.id;
    document.getElementById("plan-name").value = plan.planName;
    document.getElementById("speed").value = plan.speedMbps;
    document.getElementById("fee").value = plan.monthlyFee;
    document.getElementById("active").checked = Boolean(plan.active);
    formTitle.textContent = "Edit plan";
    submitBtn.textContent = "Save changes";
    cancelBtn.hidden = false;
    showMessage("");
    return;
  }

  if (!window.confirm(`Delete ${plan.planName}?`)) {
    return;
  }

  const response = await fetch(`/InternetPlan/Delete/${plan.id}`, { method: "DELETE" });
  const text = await response.text();
  if (!response.ok) {
    showMessage("Could not delete the plan.", true);
    return;
  }
  showMessage(text || "Plan deleted.");
  if (idInput.value === String(plan.id)) {
    resetForm();
  }
  await loadPlans();
});

loadPlans();
