// import { setupCounter } from './counter.js'
//
// document.querySelector('#app').innerHTML = `
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
// `
// setupCounter(document.querySelector('#counter'))

import {intToWords} from "./numstring.js";
import {getCodes} from "./unique-count.js";

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
    let response = await fetch("data.json")
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
            placeForFullPrice.innerHTML = fullPrice.toFixed(2)

            const placeForFullWeight = document.getElementById("fullWeight")
            const placeForFullWeightWords = document.getElementById("fullWeightWords")
            placeForFullWeight.innerHTML = fullWeight.toFixed(4)


            let fullWeightWordsKg = intToWords(Math.floor((fullWeight.toFixed(4)) * 1000))
            let fullWeightWordsG = intToWords((fullWeight.toFixed(4) * 1000 - Math.floor((fullWeight.toFixed(4)) * 1000)).toFixed(4) * 1000)
            if (fullWeightWordsG == 'ноль') {
                placeForFullWeightWords.innerHTML = fullWeightWordsKg + ' кг '
            } else {
                placeForFullWeightWords.innerHTML = fullWeightWordsKg + ' кг ' + fullWeightWordsG + ' г'
            }

            let fullPriceWordsRub = intToWords(Math.floor(fullPrice))
            let fullPriceKop = (fullPrice - Math.floor(fullPrice)).toFixed(2) * 100
            placeForFullPriceWordsRub.innerHTML = fullPriceWordsRub
            if (fullPriceKop < 10) {
                fullPriceKop = '0' + fullPriceKop
                placeForFullPriceWordsKop.innerHTML = fullPriceKop
            } else {
                placeForFullPriceWordsKop.innerHTML = fullPriceKop.toFixed(0)
            }

            const goodsAmount = document.getElementById("goodsAmount")
            goodsAmount.innerHTML = intToWords(fullAmount)

            const numbersAmountPlace = document.getElementById("numbersAmount")
            numbersAmountPlace.innerHTML = intToWords(numbersAmount)

            const codesAmountPlace = document.getElementById("codesAmount")
            codesAmountPlace.innerHTML = intToWords(codesAmount)
        })
        .catch(error => {
            console.log(error)
        })
}

appendItems()