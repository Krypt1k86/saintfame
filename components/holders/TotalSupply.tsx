import axios from 'axios'
import { useState } from 'react'
import { ethers } from 'ethers'
import { API_KEY } from '../../helper'

const TotalSupply = () => {
    let contractAddress = '0xD275B1550E8ca8Da84c552ACa9313Ec4a5B9bD07'

    let TOTAL_ENDPOINT = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${API_KEY}`

    const [balance, setBalance] = useState('...')

    axios
        .get(TOTAL_ENDPOINT)
        .then(result => {
            const rawAmount = result.data.result
            let wei = ethers.utils.bigNumberify(rawAmount)
            const amountWithDecimal = ethers.utils.formatEther(wei)
            // Parsed value has decimal place .0, removing for aesthetics
            const amount = amountWithDecimal.substring(
                0,
                amountWithDecimal.length - 2
            )

            setBalance(amount)
        })
        .catch(err => {
            setBalance('')
        })

    return (
        <div>
            <span className="container">
                <span className="LHS">
                    <div className="title">Total supply</div>
                    <span className="balance">{balance}</span>
                </span>
                <span className="RHS">
                    <div className="title">Token</div>
                    <span className="balance">$AINT</span>
                </span>
            </span>
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                }
                .LHS,
                .RHS {
                    flex-basis: 50%;
                }
                .balance {
                    font-family: Tenor Sans;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 25px;
                    line-height: 40px;
                    color: #fffafa;
                    text-align: right;
                }
            `}</style>
        </div>
    )
}

export default TotalSupply
