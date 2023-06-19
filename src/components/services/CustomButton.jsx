export default function CustomButton({ className, btnText, lan }) {
    if (!btnText) return
    return <button className={className}>{btnText[lan]}<span>{">"}</span></button>
}