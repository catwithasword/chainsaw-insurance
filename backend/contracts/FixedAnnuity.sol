// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract FixedAnnuity {
    struct Policy {
        uint256 deposit;
        uint256 payoutPerMonth;
        uint256 termMonths;
        uint256 monthsPaid;
        uint256 lastClaimed;
    }

    mapping(address => Policy) public policies;

    function buyPolicy(uint256 termMonths) external payable {
        require(termMonths > 0, "Invalid term");
        require(msg.value > 0, "Deposit required");
        require(policies[msg.sender].deposit == 0, "Policy already exists");

        uint256 payoutPerMonth = msg.value / termMonths;

        policies[msg.sender] = Policy({
            deposit: msg.value,
            payoutPerMonth: payoutPerMonth,
            termMonths: termMonths,
            monthsPaid: 0,
            lastClaimed: block.timestamp
        });
    }

    function claimMonthly() external {
        Policy storage policy = policies[msg.sender];
        require(policy.deposit > 0, "No policy");
        require(policy.monthsPaid < policy.termMonths, "Finished");
        require(block.timestamp >= policy.lastClaimed + 30 * 24 * 60 * 60, "Too early");

        policy.lastClaimed = block.timestamp;
        policy.monthsPaid++;

        (bool sent, ) = msg.sender.call{value: policy.payoutPerMonth}("");
        require(sent, "Transfer failed");
    }
}
