
export class VoteInformation {
    constructor(voter, value) {
      this.voter = voter;
      this.value = value;
    } 
} 

export class VoteCollection {
    constructor(minValue, maxValue) {
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.voteInfoHash = {}; 
        this.values = [];
    }

    inRange(voteInfo) {
        if (this.minValue != null && voteInfo.value < this.minValue)
            return false; 
        if (this.maxValue != null && voteInfo.value > this.maxValue)
            return false; 
        return true;
    }

    addVoteInfo(voteInfo) {
        if (typeof voteInfo.value === "object") {
            try {
                voteInfo.value = Number(voteInfo.value);
            }
            catch (error) {
                return;
            }
        }
        if (this.inRange(voteInfo)){
            this.voteInfoHash[voteInfo.voter] = voteInfo; //latest will override if existing
        }
    }

    calculateMedian() {
        const valuesArray = Object.values(this.voteInfoHash);
        valuesArray.sort((a, b) => a.value - b.value);
        this.values = valuesArray.map(obj => obj.value);
        //console.log("Median - " + JSON.stringify(valuesArray));
        console.log("Median - " + JSON.stringify(this.values));

        let median = 5;
        const length = valuesArray.length;
        if (length % 2 === 0) {
            median = (valuesArray[length / 2 - 1].value + valuesArray[length / 2].value) / 2;
        } else {
            median = valuesArray[Math.floor(length / 2)].value;
        }
        return median;
    }
}