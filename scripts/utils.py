from brownie import network, config, accounts

metadata_template = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {"trait_type": "color", "value": 100},
        {"trait_type": "pattern", "value": "swirl"},
        {"trait_type": "", "value": ""},
    ],
}

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]

# Util function to return an account provided by Brownie for testing or the one defined in brownie-config.yaml
def get_account():
    # if network.show_active() == "development":
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])
