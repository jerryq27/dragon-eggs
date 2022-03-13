// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DragonEggs is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("Dragon Eggs", "DEGG") {
        tokenCounter = 0;
    }

    function mintToken(address user, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newTokenId = tokenCounter;

        // ERC721 contract methods.
        _safeMint(user, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenCounter = tokenCounter + 1;
        return newTokenId;
    }
}
