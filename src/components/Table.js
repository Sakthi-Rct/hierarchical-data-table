import React, { useState } from "react";
import { initialData } from "../data/initialData";
import { updateData, updateParentTotals } from "../utils/dataHelpers";
import TableRow from "./TableRow";

const Table = () => {
  const [data, setData] = useState(initialData);
  const [inputs, setInputs] = useState({});

  const handleInputChange = (label, value) => {
    setInputs((prev) => ({ ...prev, [label]: value }));
  };

  const handleAllocationPercentage = (label, percentage) => {
    const newData = [...data];
    updateData(newData, label, (item) => {
      const increase = (item.value * percentage) / 100;
      item.value += increase;
      item.variance = calculateVariance(item.value, item.defaultValue);
      // Update children if the item is a parent
      if (item.children) {
        item.children.forEach((child) => {
          const childIncrease = (child.value * percentage) / 100;
          child.value += childIncrease;
          child.variance = calculateVariance(child.value, child.defaultValue);
        });
      }
    });
    setData(updateParentTotals(newData));
  };

  const calculateVariance = (currentValue, defaultValue) => {
    const variance = ((currentValue - defaultValue) / defaultValue) * 100;
    return variance.toFixed(2) + "%";
  };

  const handleAllocationValue = (label, value) => {
    const newData = [...data];
    updateData(newData, label, (item) => {
      // Update current item value and variance based on default value
      item.value = value;
      item.variance = calculateVariance(value, item.defaultValue);

      // If it's a parent, update children proportionally
      if (item.children) {
        const totalChildrenValue = item.children.reduce(
          (sum, child) => sum + child.value,
          0
        );

        item.children.forEach((child) => {
          const proportion = child.value / totalChildrenValue;
          const newChildValue = Number((value * proportion).toFixed(2));
          child.value = newChildValue;
          child.variance = calculateVariance(newChildValue, child.defaultValue);
        });
      }
    });
    // Add back updateParentTotals to handle child-to-parent updates
    setData(updateParentTotals(newData));
  };

  return (
    <div className="table-wrapper">
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.label}>
              <TableRow
                item={item}
                inputs={inputs}
                handleInputChange={handleInputChange}
                handleAllocationPercentage={handleAllocationPercentage}
                handleAllocationValue={handleAllocationValue}
              />
              {item.children &&
                item.children.map((child) => (
                  <TableRow
                    key={child.label}
                    item={child}
                    isChild={true}
                    inputs={inputs}
                    handleInputChange={handleInputChange}
                    handleAllocationPercentage={handleAllocationPercentage}
                    handleAllocationValue={handleAllocationValue}
                  />
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
