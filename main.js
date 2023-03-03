import {intToWords} from "./src/js/numstring.js";
import {getCodes} from "./src/js/unique-count.js";

function createItem(item) {
    return `<tr className="item">
        <td colSpan="12" className="item-left">${item.code}</td>
        <td colSpan="19">${item.nomer}</td>
        <td colSpan="13">${item.articul}</td>
        <td colSpan="12" className="item-right">${item.quantity}</td>
        <td colSpan="16" className="item-right">${item.price.toFixed(2)}</td>
        <td colSpan="39" className="item-left">${item.name + ', ' + item.name_number}</td>
        <td colSpan="11" className="item-center">${item.unit}</td>
        <td colSpan="11" className="item-center">${item.package}</td>
        <td colSpan="11" className="item-center">${item.amount}</td>
        <td colSpan="14" className="item-right">${(item.weight * item.amount).toFixed(4)}</td>
        <td colSpan="11" className="item-right">${(item.price * item.amount).toFixed(2)}</td>
        <td colSpan="18"></td>
    </tr>`
}

let calcFullPrice = (items) => {
    items.forEach()
}
let appendItems = async () => {
    const url = "src/data.json"
    let response = await fetch(url)
        .then(resolve => {
            return resolve.json()
        })
        .then(json => {
            const placeForItems = document.getElementById("items")

            let items = json.order.sort((a, b) => a.quantity - b.quantity)

            let fullPrice = 0
            let fullWeight = 0
            let fullAmount = 0
            let numbersAmount = items.length
            let codesAmount = getCodes(items)

            items.forEach((item) => {
                fullPrice += item.price * item.amount
                fullWeight += item.weight * item.amount
                fullAmount += item.amount
                placeForItems.insertAdjacentHTML('beforeend', createItem(item))
            })

            const placeForFullPrice = document.getElementById("fullPrice")
            const placeForFullPriceWordsRub = document.getElementById("fullPriceRub")
            const placeForFullPriceWordsKop = document.getElementById("fullPriceKop")
            setPriceTexts([placeForFullPrice, placeForFullPriceWordsRub, placeForFullPriceWordsKop], fullPrice)


            const placeForFullWeight = document.getElementById("fullWeight")
            const placeForFullWeightWords = document.getElementById("fullWeightWords")
            setWeightTexts([placeForFullWeight, placeForFullWeightWords], fullWeight)


            setAmountsTexts(document.getElementById("goodsAmount"), fullAmount)
            setAmountsTexts(document.getElementById("numbersAmount"), numbersAmount)
            setAmountsTexts(document.getElementById("codesAmount"), codesAmount)

        })
        .catch(error => {
            console.log(error)
        })
}

const setPriceTexts = (places, price) => {
    places[0].innerHTML = price.toFixed(2)
    let fullPriceWordsRub = intToWords(Math.floor(price))
    let fullPriceKop = (price - Math.floor(price)).toFixed(2) * 100

    places[1].innerHTML = fullPriceWordsRub
    if (fullPriceKop < 10) {
        fullPriceKop = '0' + fullPriceKop
        places[2].innerHTML = fullPriceKop
    } else {
        places[2].innerHTML = fullPriceKop.toFixed(0)
    }
}

const setWeightTexts = (places, weight) => {
    places[0].innerHTML = weight.toFixed(4)

    let weightWordsKg = intToWords(Math.floor((weight.toFixed(4)) * 1000))
    let weightWordsG = intToWords((weight.toFixed(4) * 1000 - Math.floor((weight.toFixed(4)) * 1000)).toFixed(4) * 1000)
    if (weightWordsG == 'ноль') {
        places[1].innerHTML = weightWordsKg + ' кг '
    } else {
        places[1].innerHTML = weightWordsKg + ' кг ' + weightWordsG + ' г'
    }
}
const setAmountsTexts = (place, amount) => {
    place.innerHTML = intToWords(amount)
}

appendItems()