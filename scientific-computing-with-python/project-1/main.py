#coding:utf-8


def arithmetic_arranger(operation_table, calcul_choice=False):
    try:
        final_string_1 = ""
        final_string_2 = ""
        final_string_3 = ""
        final_string_4 = "\n"
        
        if len(operation_table) > 5:
            raise Exception('Error: Too many problems.')
        
        i = 0
        while i < len(operation_table):
            operation = operation_table[i]
            (first_operand, operator, second_operand) = operation.split(' ')
            if not operator in ['-', '+']:
                raise Exception("Error: Operator must be '+' or '-'.")
            if len(first_operand) > 4 or len(second_operand) > 4:
                raise Exception("Error: Numbers cannot be more than four digits.")
            try:
                int(first_operand)
                int(second_operand)
            except:
                raise Exception('Error: Numbers must only contain digits.')



            # PRINTING
            length_operation = max(len(first_operand), len(second_operand)) + 2
            result_operation = str(int(first_operand) + int(second_operand) if operator == "+" else int(first_operand) - int(second_operand))
            
            space = "" if i == len(operation_table) - 1 else "    "



            final_string_1 += ''.join([' ' for _ in range(length_operation - len(first_operand))]) + first_operand + space
            final_string_2 += operator + ''.join([' ' for _ in range(length_operation - len(second_operand) - 1)]) + second_operand + space
            final_string_3 += ''.join(['-' for _ in range(length_operation)]) + space
            if calcul_choice:
                final_string_4 += ''.join([' ' for _ in range(length_operation - len(result_operation))]) + result_operation + space
            else:
                final_string_4 = ""

            i += 1
        
        return f"{final_string_1}\n{final_string_2}\n{final_string_3}{final_string_4}"
         
    except Exception as e:
        return str(e)
    



a = arithmetic_arranger(["9999 + 9999", "3801 - 2", "45 + 43", "123 + 49"], True)
# print(a)
print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')