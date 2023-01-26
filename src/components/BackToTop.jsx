import { useState, useEffect } from 'react';

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    const buttonVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', buttonVisibility);
        return () => {
            window.removeEventListener('scroll', buttonVisibility);
        }
    }, [])

    return (
        <button type="button" onClick={scrollToTop} className={`backToTop ${isVisible ? "active" : ""}`}>
            <i className="fa-solid fa-chevron-up fa-bounce" />
        </button>
    )
}

export default BackToTop;