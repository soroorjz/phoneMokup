import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const DescriptionBoxComponent = ({
  box,
  onEdit,
  onDelete,
  onSubmit,
  onEnableEdit,
}) => {
  return (
    <div className="box">
      <textarea
        className="boxTexArea"
        value={box.text}
        onChange={(e) => onEdit(box.id, e.target.value)}
        disabled={box.isSubmitted}
      />
      <div className="box-actions">
        <button className="editeBtn" onClick={() => onEnableEdit(box.id)}>
          <CiEdit />
          ویرایش
        </button>
        <button className="deleteBtn" onClick={() => onDelete(box.id)}>
          <MdDelete />
          حذف
        </button>
        {!box.isSubmitted && (
          <button className="submitBtn" onClick={() => onSubmit(box.id)}>
            <IoMdCheckmarkCircleOutline />
            ثبت
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionBoxComponent;
