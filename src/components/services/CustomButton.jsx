export default function CustomButton({ className, btnText, lan, onClickFunction, showArrow = false }) {
    if (!btnText) return
    return <button onClick={onClickFunction} className={className}>{btnText[lan]}{showArrow && <span>{">"}</span>}</button>
}