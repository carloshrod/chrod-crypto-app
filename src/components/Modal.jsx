import { useEffect } from 'react';
import { useCoinsContext } from '../context/CoinsContext';

function Modal({ children }) {
    const { fetchCoin, coinId, modalAction, setResult } = useCoinsContext();

    useEffect(() => {
        fetchCoin();
        setResult(null);
    }, [coinId])

    return (
        <div className="d-flex">
            <div
                className="modal fade m-0" id="exampleModal" tabIndex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div
                    className={`modal-dialog modal-dialog-centered modal-${modalAction === "details" ? "lg" : "md"}`}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button" className="btn-close btn-danger"
                                data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal;