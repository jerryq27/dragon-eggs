from brownie import DragonEggs, config, network
from utils import get_account


def deploy():
    account = get_account()
    dragon_eggs = DragonEggs.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify_contract"),
    )
    print(f"{account} -> {dragon_eggs}")


def main():
    deploy()
