import React, { useState } from "react";
import "./SelectableList.scss";
const items = [
  {
    id: 1,
    name: "تعداد کل ظرفیت استخدام  ",
    sku: "۱۳۴",
  },
  {
    id: 2,
    name: "ظرفیت استخدام بانوان",
    sku: "۳۵۴",
  },
  {
    id: 3,
    name: "ظرفیت استخدام آقایان",
    sku: "۲۵۶",
  },
  {
    id: 4,
    name: "ظرفیت استخدام با سهمیه",
    sku: "۶۲",
  },
  {
    id: 5,
    name: "ظرفیت استخدام بدون سهمیه",
    sku: "۵۲",
  },
];

const SelectableList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [maxSelections, setMaxSelections] = useState(5);

  const handleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else if (selectedItems.length < maxSelections) {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleMaxSelectionsChange = (event) => {
    setMaxSelections(parseInt(event.target.value));
  };

  return (
    <div className="selectable-list">
      <div className="header">
        <h2>عناوین گزارشات</h2>
        {/* <p>
          Selected: {selectedItems.length} / {maxSelections}
        </p>
        <input
          type="number"
          value={maxSelections}
          onChange={handleMaxSelectionsChange}
          placeholder="Max selections"
        /> */}
      </div>
      <nav className="exam-info-nav-sj">
        <button>ظرفیت استخدام </button>
        <button>پذیرفته‌شدگان</button>
        <button>استخدام‌شدگان</button>
        <button>اعتراضات </button>
      </nav>
      <table className="item-table">
        <thead>
          <tr>
            <th></th>
            <th className="title"> عنوان گزارش</th>
            <th>تعداد نفران</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={selectedItems.includes(item.id) ? "selected" : ""}
              onClick={() => handleSelection(item.id)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  readOnly
                />
              </td>
              <td>
                <div className="item-info">{item.name}</div>
              </td>
              <td className="num">{item.sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectableList;
