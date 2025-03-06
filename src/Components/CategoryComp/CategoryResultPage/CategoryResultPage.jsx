import React from "react";
import "./CategoryResultPage.scss";
import CategoryResultChart from "../../CategoryResultChart/CategoryResultChart";

const CategoryResultPage = ({
  selectedOptions = {},
  clearSelection,
  onHideResults,
}) => {
  return (
    <div className="category-result-page">
      <div className="selected-options-container">
        {Object.entries(selectedOptions).length > 0 ? (
          Object.entries(selectedOptions).map(([category, option]) => (
            <div key={category} className="selected-option">
              <span>
                {`${category}: ${
                  typeof option === "object" && option.name
                    ? option.name
                    : option
                }`}
              </span>
              {/* <button
                className="remove-option-btn"
                onClick={() => clearSelection(category)}
              >
                ✖
              </button> */}
            </div>
          ))
        ) : (
          <p>هیچ گزینه‌ای انتخاب نشده است.</p>
        )}
      </div>

      <div className="chart-container">
        <CategoryResultChart selectedOptions={selectedOptions} />
      </div>

      <button className="back-btn" onClick={onHideResults}>
        برگشت
      </button>
    </div>
  );
};

export default CategoryResultPage;
