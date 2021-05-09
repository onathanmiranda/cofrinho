export default function FormatPercent({ children }){

    const percentage = `${children * 100}%`

    return <>{percentage}</>
}