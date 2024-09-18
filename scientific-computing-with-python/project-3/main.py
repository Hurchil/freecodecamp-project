from typing import Type

class Category:
    def __init__(self, name:str) -> None:
        self.ledger:list = []
        self.name = name
        self.solde:float = 0
    
    # Faire un dépôt dans le compte
    def deposit(self, montant:float, description="") -> None:
        self.solde += montant
        self.ledger.append({
            "amount": montant,
            "description": description
        })

    # Faire un retrait dans le compte
    def withdraw(self, montant, description=""):
        if not self.check_funds(montant):
            return False
        self.solde -= montant
        self.ledger.append({
            "amount": montant * -1,
            "description": description or ""
        })
        return True

    # Renvoie le solde actuel
    def get_balance(self):
        return self.solde
    
    # Transfert un montant vers une autre catégorie
    def transfer(self, montant, category: Type['Category']):
        if not self.check_funds(montant):
            return False
        self.withdraw(montant, f'Transfer to {category.name}')
        category.deposit(montant, f'Transfer from {self.name}')
        return True

    # Vérifie si le montant fourni dépasse le solde ou non
    def check_funds(self, montant:float) -> bool:
        return self.solde >= montant

    def __str__(self):
        name = self.name 
        s = name.center(30,"*") 
        for items in self.ledger:
            try:
                left = items['description'][0:23]
            except TypeError:
                left = ''
            right = str("{:.2f}".format(items['amount']))
            s+= f"\n{left:<23}{right:>7}"
        s += "\nTotal: "+ str(self.get_balance())
        return s 
def create_spend_chart(categories):
    spent_dict = {}
    for i in categories:
        s = 0 
        for j in i.ledger:
            if j['amount'] < 0:
                s += abs(j['amount'])
        spent_dict[i.name] = round(s, 2)
    
    total = sum(spent_dict.values())
    percent_dict = {}
    for k in spent_dict.keys():
        percent_dict[k] = int(round(spent_dict[k] / total, 2) * 100)
    
    output = 'Percentage spent by category\n'
    for i in range(100, -10, -10):
        output += f'{i}'.rjust(3) + '| '
        for percent in percent_dict.values():
            if percent >= i:
                output += 'o  '
            else:
                output += '   '
        output += '\n'
    
    output += ' ' * 4 + '-' * (len(percent_dict.values()) * 3 + 1)
    output += '\n     '
    dict_key_list = list(percent_dict.keys())
    max_len_category = max([len(i) for i in dict_key_list])
    
    for i in range(max_len_category):
        for name in dict_key_list:
            if len(name) > i:
                output += name[i] + '  '
            else:
                output += '   '
        if i < max_len_category - 1:
            output += '\n     '
    
    return output

AAA = Category("AAA")
BBB = Category("BBB")

AAA.deposit(100, "Initial deposit")
BBB.deposit(50, "Initial deposit")

AAA.withdraw(14.56, "pour rien")
AAA.transfer(45.36, BBB)
# print(f"AAA: {AAA.ledger}\nBBB: {BBB.ledger}")
print(AAA)

food = Category('Food')
food.deposit(1000, 'deposit')
food.withdraw(10.15, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
clothing = Category('Clothing')
food.transfer(50, clothing)
print(food)


print(create_spend_chart([AAA, BBB, food]))