import React from 'react';
import "./DeleteBox.css";
import { GrClose } from "react-icons/gr";
import { BsExclamationTriangleFill } from "react-icons/bs";


function DeleteBox({active}) {

    const closeCont = () => {

    }

    return (
        <div className="deletebox">
            <div className={!active ? "container": "container.active"}>
                <i id="allclose" className="close__btn" onClick={closeCont}><GrClose /></i>
                <h3 className="delete__h3">Are you sure?</h3>
                <p className="sub__heading">This is going to permanently delete, are you sure?</p>
                <div className="warning">
                    <i className="triangle"><BsExclamationTriangleFill /></i>
                    <p className="warn__para">By deleteing this item, you can't restore it later!</p>
                </div>
                <button className="cancel" onClick={closeCont}>Cancel</button>
                <button className="yes__delete">Yes, Delete</button>
            </div>

        </div>
    )
}

export default DeleteBox
