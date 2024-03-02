function goToBuyTicketSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.scrollIntoView();
}


const maxSeatSelection = 4;
let currentSelection = 0;
let stateManager = [];
function selectSeat(seatId) {
    let seat = document.getElementById(seatId);
    if (stateManager.includes(seat.innerText) && (currentSelection <= maxSeatSelection)) {
        let index = stateManager.indexOf(seat.innerText);
        if (index !== -1) {
            stateManager.splice(index, 1);
        }
        currentSelection -= 1;
        seat.style.backgroundColor = '#F7F8F8';
        seat.style.color = '#000';
        setRemainingSeat('seatLeft', false);
        setSeatCounterWithStyle('seatCount', false);
        setSeatInfo('seat-info', seat.innerText, false);
        setTotalPrice('total-price', false);
        setGrandTotal('grand-total');
        if (currentSelection === maxSeatSelection) {
            activateApplyBtn('apply-btn', true);
        }
        else {
            activateApplyBtn('apply-btn', false);
        }
    }
    else {
        if (currentSelection < maxSeatSelection) {
            stateManager.push(seat.innerText);
            currentSelection += 1;
            seat.style.backgroundColor = '#1DD100';
            seat.style.color = '#fff';
            setRemainingSeat('seatLeft', true);
            setSeatCounterWithStyle('seatCount', true);
            setSeatInfo('seat-info', seat.innerText, true);
            setTotalPrice('total-price', true);
            setGrandTotal('grand-total');
            if (currentSelection === maxSeatSelection) {
                activateApplyBtn('apply-btn', true);
            }
            else {
                activateApplyBtn('apply-btn', false);
            }
        }
    }
}

function setRemainingSeat(seatLeft, validation) {
    if (validation) {
        const seatRemaining = parseInt(document.getElementById(seatLeft).innerText) - 1;
        document.getElementById(seatLeft).innerText = seatRemaining;
    }
    else {
        const seatRemaining = parseInt(document.getElementById(seatLeft).innerText) + 1;
        document.getElementById(seatLeft).innerText = seatRemaining;
    }

}

function setSeatCounterWithStyle(seatCount, validation) {
    let counter = document.getElementById(seatCount);
    if (validation) {
        let counterInt = parseInt(counter.innerText) + 1;
        counter.innerText = counterInt;
        counter.style.backgroundColor = '#1DD100';
    }
    else {
        let counterInt = parseInt(counter.innerText) - 1;
        counter.innerText = counterInt;
        counter.style.backgroundColor = '#1DD100';
    }

}

function setSeatInfo(seatInfo, seatNumber, validation) {
    let tr = document.getElementById(seatInfo);
    if (validation) {
        tr.innerHTML += `
    <tr">
        <td>${seatNumber}</td>
        <td>Economy</td>
        <td>550</td>
    </tr>
    `;
    }
    else if (tr.children.length > 0) {
        for (let i = 0; i < tr.children.length; i++) {
            let td = tr.children[i].querySelector('td:first-child');
            if (td) {
                if (td.textContent === seatNumber) {
                    tr.removeChild(tr.children[i]);
                    break;
                }
            }

        }
    }

}

function setTotalPrice(totalPrice, validation) {
    let tPrice = document.getElementById(totalPrice);
    if (validation) {
        let newPrice = parseInt(tPrice.innerText) + 550;
        tPrice.innerText = newPrice;
    }
    else {
        let newPrice = parseInt(tPrice.innerText) - 550;
        tPrice.innerText = newPrice;
    }
}

function setGrandTotal(grandTotal) {
    let gTotal = document.getElementById(grandTotal);
    let totalPrice = document.getElementById('total-price');
    gTotal.innerText = totalPrice.innerText;
}

function activateApplyBtn(buttonId, validation) {
    const button = document.getElementById(buttonId);
    if (validation) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}

function discountAmount(code) {
    let discountCode = document.getElementById(code);
    discountCode = discountCode.value;
    let totalPrice = document.getElementById('total-price');
    if (discountCode === 'NEW15') {
        let discount = parseFloat(totalPrice.innerText) * .15;
        document.getElementById('discount-amount').textContent = discount;
        document.getElementById('discount-div').style.display = 'flex';

    }
    else if (discountCode === 'Couple20') {
        let discount = parseFloat(totalPrice.innerText) * .20;
        document.getElementById('discount-amount').textContent = discount;
        document.getElementById('discount-div').style.display = 'block';
    }
}