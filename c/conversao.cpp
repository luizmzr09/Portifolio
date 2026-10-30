#include <stdio.h>
#include <locale.h>
main()
{
    setlocale(LC_ALL, "Portuguese");
    float M[6], R, C; //M-moeda, R-Reais, C-Conversão
    int op;
    M[0] = 5.43;
    M[1] = 0.005;
    M[2] = 14.40;
    M[3] = 6.70;
    M[4] = 7.30;
    M[5] = 6.20;
    printf("Digite o valor em reais: R$");
    scanf("%f", &R);
    while(R!= 0)
    {
        printf("\n1 - Dolar");
        printf("\n2 - Peso argentino");
        printf("\n3 - Dinar do Bahrein");
        printf("\n4 - Franco suico");
        printf("\n5 - Libra esterlina");
        printf("\n6 - Euro");
        printf("\n\nEscolha a moeda: ");
        scanf("%i", &op);
        C=R/M[op - 1];
        printf("\nA pessoa recebera %.2f da moeda escolhida\n", C);
        printf("\nDigite o valor em reais: R$");
        scanf("%f", &R);
    }
}
