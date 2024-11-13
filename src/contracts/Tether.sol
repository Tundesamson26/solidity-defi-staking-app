// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Tether {
    string public name = "Meal Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // require that the value is greater or equal for transfer
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and subtract from balance
        balanceOf[msg.sender] -= _value;
        // add the balnce
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // require that the value is greater or equal for transfer
        require(balanceOf[_from] >= _value, "Insufficient balance");
        // require that the value is greater or equal for transfer
        require(allowance[_from][msg.sender] >= _value, "Insufficient balance");
        // add the balnce
        balanceOf[_to] += _value;
        // subtract the balance from transferFrom
        balanceOf[_from] -= _value;
        // subtract the allowance
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
