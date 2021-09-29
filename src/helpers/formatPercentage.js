export default function fomatPercentage( value ){

  var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'percent'
  })
  
  const FormatCurrency = formatter.format

  return FormatCurrency( value )
}