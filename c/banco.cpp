#include <stdio.h>
main()
{
	int i, opt;
	float Sald, Depo, Saq;
	opt=1;
	Sald=1000;
	while (opt!=4)
	{
	printf("\nBanco tche tche --seu dinheiro com voce--");
	printf("\n1-Consultar saldo");
	printf("\n2-Depositar");
	printf("\n3-Sacar");
	printf("\n4-Sair");
	printf("\nQual opcao deseja? ");
	scanf("%i", &opt);
	switch (opt)
	{
	case 1:
		printf("Seu saldo e de: %.2f", Sald);
		break;
		case 2:
			printf("Quanto voce deseja depositar? ");
			scanf("%f", &Depo);
			Sald=Sald+Depo;
			printf("Foi depositado %.2f, agora o saldo e de: %.2f", Depo, Sald);
			break;
			case 3:
				printf("Quanto deseja sacar?");
				scanf("%f", &Saq);
				Sald=Sald-Saq;
				printf("Foi sacado %.2f, agora seu saldo e de: %.2f", Saq, Sald);
				break;
				case 4:
					printf("Banco fechado, vlw por confiar em nosso banco :)");
					break;
				default:
					printf("Opcao nao definida!");
					break;
				}
			}
		}
