import type { ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import "./actionsCellRenderer.css";

export class ActionsCellRenderer implements ICellRendererComp {
  private eGui!: HTMLDivElement;

  public init(params: ICellRendererParams): void {
    const { api, node } = params;

    this.eGui = document.createElement("div");
    this.eGui.className = "buttonCell";

    const onRemoveClick = async () => {
      const rowData = node.data;
      const transactionId = rowData.id; // MUST match backend DTO

      const token = localStorage.getItem("token"); // or wherever you store JWT
      if (!token) {
        alert("Not authenticated");
        return;
      }

      try {
        const res = await fetch(
          `http://172.16.4.3:5000/api/transactions/${transactionId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Delete failed");
        }

        // Only remove from grid AFTER backend confirms deletion
        api.applyTransaction({ remove: [rowData] });
      } catch (err) {
        console.error(err);
        alert("Failed to delete transaction");
      }
    };

    const removeButton = document.createElement("button");
    removeButton.className = "button-secondary removeButton";
    removeButton.addEventListener("click", onRemoveClick);
    removeButton.innerHTML = `
      <svg
        class="trashIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-1 14H6L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M9 6V4h6v2"></path>
      </svg>
    `;

    this.eGui.appendChild(removeButton);
  }

  public getGui(): HTMLElement {
    return this.eGui;
  }

  public refresh(): boolean {
    return false;
  }
}
