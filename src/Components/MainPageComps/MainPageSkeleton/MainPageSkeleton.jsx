import React from "react";
import "./MainPageSkeleton.scss";

const MainPageSkeleton = () => {
  const skeletonRows = Array(4).fill(); // ۴ ردیف برای جدول زیر نمودار

  return (
    <div className="exam-report-slider-skeleton">
      {/* <div className="exam-reportHeader-skeleton">
        <div className="user-info-skeleton">
          <div className="userName-skeleton skeleton-box"></div>
          <div className="userPosition-skeleton skeleton-box"></div>
        </div>
        <div className="search-bar-skeleton">
          <div className="search-icon-skeleton skeleton-box"></div>
          <div className="search-input-skeleton skeleton-box"></div>
        </div>
        <div className="logoPart-skeleton skeleton-box"></div>
      </div> */}

      <div className="mainContentTitle-skeleton">
        <div className="filter-container-skeleton">
          <div className="filter-containerBtn-skeleton">
            <div className="filter-icon-skeleton skeleton-box"></div>
            <div className="filterSpan-skeleton skeleton-box"></div>
          </div>
          <div className="selected-filter-skeleton skeleton-box"></div>
        </div>
      </div>

      <div className="mainContent-skeleton">
        <div className="exam-section-skeleton">
          <div className="exam-title-skeleton skeleton-box"></div>
          <div className="chart-container-skeleton">
            <div className="doughnut-chart-skeleton skeleton-box"></div>
          </div>
          <div className="MainPage-exam-stats-skeleton">
            <div className="stats-title-skeleton skeleton-box"></div>
            <ul className="stats-list-skeleton">
              {skeletonRows.map((_, index) => (
                <li key={index} className="stats-item-skeleton">
                  <div className="stats-label-skeleton skeleton-box"></div>
                  <div className="stats-value-skeleton skeleton-box"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageSkeleton;
