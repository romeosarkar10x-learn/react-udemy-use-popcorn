export default function BoxToggleButton({ isOpen, setIsOpen }) {
    return (
        <button
            className="btn-toggle"
            onClick={() => setIsOpen(open => !open)}>
            {isOpen ? "–" : "+"}
        </button>
    );
}
