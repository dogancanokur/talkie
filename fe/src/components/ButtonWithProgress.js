import React from 'react';

function ButtonWithProgress(props) {
    const {id, type, className, containerClassName, disabled, onClick, pendingApiCall, text} = props;
    return (<div className={containerClassName}>
        <button className={className}
                id={id}
                disabled={disabled}
                onClick={onClick}
                type={type}>
            {pendingApiCall && <div className="spinner-border spinner-border-sm mr-1" role="status">
                <span className="visually-hidden"></span></div>}{text}</button>
    </div>);
}

export default ButtonWithProgress;