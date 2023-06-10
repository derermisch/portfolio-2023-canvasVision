export default function ServiceItem({ serviceItemData, lan, index}) {
    return (
        <div className="service--itemContainer--item">
            <p className="service--itemContainer--item--text">{serviceItemData[lan]}</p>
            <div className="service--itemContainer--item--route route"></div>
        </div>
    )
}