// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


/// @title Test ERC20
/// @dev This is a test contract about ERC20
/// @author Michael Liu
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract ERC20Token is Initializable, ERC20Upgradeable, OwnableUpgradeable {

    //symbol is "TERC20", name is "Test ERC20"
    function initialize() public initializer {
        __ERC20_init("Test ERC20", "TERC20");
        __Ownable_init();
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Mint 1 million tokens to the deployer
        _mint(address(this), 9000000 * 10 ** decimals()); // Mint the remaining 9 million tokens to the contract
    }

    //define decimal to 6, default is 18
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    //only onwer can burn the token
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
