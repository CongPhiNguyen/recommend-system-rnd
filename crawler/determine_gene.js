const geneIDList =
  "391b0,87cc8,5920b,4d32c,5ca48,b9af3,cdc58,a3c67,33771,cdad7,ace04,81c83,50880,c8cbe,ee968,b1e97,3b60b,423e2,256c8,e5301,69964,7064a,07251,f8f62,acc80"
const geneNameList =
  "Action,Adventure,Boys' Love,Comedy,Crime,Drama,Fantasy,Girls' Love,Historical,Horror,Isekai,Magical Girls,Mecha,Medical,Mystery,Philosophical,Psychological,Romance,Sci-Fi,Slice of Life,Sports,Superhero,Thriller,Tragedy,Wuxia"

const handleMapGenes = (geneIDListVal, geneNamesVal) => {
  const arrId = geneIDListVal.split(",")
  const nameId = geneNamesVal.split(",")
  return arrId.map((id, index) => {
    return {
      id: id,
      name: nameId[index]
    }
  })
}

const geneList = handleMapGenes(geneIDList, geneNameList)
console.log(geneList)
