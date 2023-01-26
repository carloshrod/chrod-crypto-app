import { useState } from "react";
import { useCoinsContext } from "../context/CoinsContext";
import { ClipLoader } from "react-spinners";

function Navbar() {
    const { setFilter } = useCoinsContext();
    const [isTyping, setIsTyping] = useState(false);

    const handleChange = (e) => {
        setIsTyping(true);
        const { value } = e.target;
        setFilter(value);
        setTimeout(() => {
            setIsTyping(false);
        }, 750);
    }

    return (
        <header className="navbar">
            <img
                src="/crypto-logo.png"
                className="navbar__logo"
            />
            <div className="navbar__filter">
                <input
                    className="form-control"
                    placeholder="Filter..." type="text"
                    onChange={handleChange}
                />
                {isTyping &&
                    <ClipLoader
                        color="#303030"
                        size={20}
                        cssOverride={{
                            position: "absolute",
                            right: ".7rem"
                        }}
                    />
                }
            </div>
        </header>
    )
}

export default Navbar;