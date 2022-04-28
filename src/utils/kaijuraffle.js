import { ethers } from "ethers";
/*
Note: this was copied from ipfs://Qme39rVRnyPGpRadJidg1jEdd5RLXBdhiEwSnv2YcTkJMp
The only modifications I made was to return the random number that was used to pick from the list of entries each time it loops
Also added a lookup table to see how many total entries people had
*/

/*
Original script available at: ipfs://Qme39rVRnyPGpRadJidg1jEdd5RLXBdhiEwSnv2YcTkJMp
*/

/*
 * Author: Augminted Labs, LLC
 * Parameter `raffle` is an "ethers" contract object (see: https://docs.ethers.io/v5/api/contract/contract/)
 * Events are assumed to be returned ordered by ascending block number and transaction index
 */
async function drawOpenRaffleWinners(raffle) {
    const entryEvents = await raffle.queryFilter(raffle.filters.EnterRaffle());

    // This for loop was added for an additional lookup table for total entries
    let totalEntries = {};
    for (let i = 0; i < entryEvents.length; i++) {
        const entry = entryEvents[i]
        if (entry.args.account in totalEntries) {
            totalEntries[entry.args.account] = {
                amount: totalEntries[entry.args.account].amount + entry.args.amount.toNumber()
            }
        } else {
            totalEntries[entry.args.account] = {
                amount: entry.args.amount.toNumber()
            }
        }
    }
    // End of custom lookup table

    let entries = [];
    for (let i = 0; i < entryEvents.length; i++) {
        entries.push.apply(entries, [...new Array(entryEvents[i].args.amount.toNumber())].map(() => entryEvents[i].args.account));
    }

    const winners = [];
    const numberOfWinners = await raffle.NUMBER_OF_WINNERS();

    let randomness = await raffle.seed();
    while (numberOfWinners.gt(winners.length)) {
        const winner = entries[randomness.mod(entries.length)];

        // This next line was slightly modified from the original code
        winners.push({ address: winner, entry: randomness.mod(entries.length).toNumber(), total: totalEntries[winner].amount });

        entries = entries.filter((entry) => entry !== winner);

        randomness = ethers.BigNumber.from(ethers.utils.solidityKeccak256(["uint256"], [randomness]));
    }

    return winners;
}

export default drawOpenRaffleWinners;