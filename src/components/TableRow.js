import React from "react";

const TableRow = ({
  item,
  isChild,
  inputs,
  handleInputChange,
  handleAllocationPercentage,
  handleAllocationValue,
}) => {
  const formattedValue = Number.isInteger(Number(item.value))
    ? item.value
    : Number(item.value).toFixed(2);

  return (
    <tr className={isChild ? "child-row" : "parent-row"}>
      <td>{isChild ? `└─ ${item.label}` : item.label}</td>
      <td>{formattedValue}</td>
      <td>
        <input
          type="number"
          value={inputs[item.label] || ""}
          onChange={(e) =>
            handleInputChange(item.label, parseFloat(e.target.value) || "")
          }
          className="value-input"
        />
      </td>
      <td>
        <button
          onClick={() =>
            handleAllocationPercentage(
              item.label,
              parseFloat(inputs[item.label]) || 0
            )
          }
          className="allocation-btn"
        >
          Apply %
        </button>
      </td>
      <td>
        <button
          onClick={() =>
            handleAllocationValue(
              item.label,
              parseFloat(inputs[item.label]) || 0
            )
          }
          className="allocation-btn"
        >
          Set Value
        </button>
      </td>
      <td>{item.variance || "0%"}</td>
    </tr>
  );
};

export default TableRow;
