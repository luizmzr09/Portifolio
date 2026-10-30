#include <stdio.h>
#include <locale.h>
#include <string.h>

int RT (int cod[20], char nomeT[20][50])
{
	int i;
	for (i=0;i<5;i++)
	{
		printf("\nDigite o código do time: ");
		scanf("%i", &cod[i]);
		printf("\nDigite o nome do time: ");
		scanf("  %[^\n]", nomeT[i]);
	}
	return 0;
}
int ZR (int pts[20], int vt[20], int gl[20])
{
	int i;
	for(i=0;i<5;i++)
	{
		pts[i]=0;
		vt[i]=0;
		gl[i]=0;
	}
	printf("\nOs dados foram zerados!");
	return 0;
}
int ALT (int codi[20], int pts[20], int vt[20], int gl[20])
{
	int cod, i, AC;
	AC=0;
	printf("\nDigite o código do time: ");
	scanf("%i", &cod);
	for (i=0;i<5;i++)
	{
		if(codi[i]==cod)
		{
			printf("\nDigite a quantidade de pontos: ");
			scanf("%i", &pts[i]);
			printf("\nDigite a quantidade de vitórias: ");
			scanf("%i", &vt[i]);
			printf("\nDigite a quantidade de gols: ");
			scanf("%i", &gl[i]);
		    AC=1;
		}
	}
	if (AC==0)
	{
		printf("\nO time não foi encontrado!");
	}
	printf("\nOs dados foram alternados!");
	return 0;
}
int ALTN(int cod[], char nomeA[][50])
{ int codi, i, AC;
AC=0;
printf("\nDigite o código do time: ");
scanf("%i", &codi);
for (i=0;i<5;i++)
{
	if(cod[i]==codi)
	{
		printf("\nDigite o nome do artilheiro: ");
		scanf("  %[^\n]", nomeA[i]);
		AC=1;
	}
}
if(AC==0)
{
	printf("\nO time não foi encontrado!");
}
printf("\nOs nomes foram alterados!");
return 0;
}
int VC(int pts[], char nomeT[][50], char nomeA[][50])
{
	int i, maior;
	maior=0;
	for(i=0;i<5;i++)
	{
		if(pts[i]>pts[maior])
		{
			maior=i;
		}
	}
	printf("\nO CAMPEÃO DO CAMPEONATO DE FUTEBOL BRASILEIRO");
	printf("\nTime: %s", nomeT[maior]);
	printf("\nArtilheiro: %s", nomeA[maior]);
	printf("\nPontos: %i", pts[maior]);
	return 0;
}
int MG(int gl[], char nomeA[][50])
{
	int i, maior;
	maior=0;
	for(i=0;i<5;i++)
	 {
	 if(gl[i]>gl[maior])
	 {
		maior=i;
	 }
    }
    printf("\nARTILHEIRO QUE FEZ MAIS GOLS");
    printf("\nArtilheiro: %s", nomeA[maior]);
return 0;
}



main()
{

setlocale(LC_ALL, "Portuguese");
int cod[20], pts[20], vt[20], gl[20];
char nomeT [20][50], nomeA [20][50];
int opt;
do {
	printf("\nCAMPEONATO DE FUTEBOL BRASILEIRO\n");
	printf("\n1-Registrar os times");
	printf("\n2-Zerar a pontuação, vitórias e gols");
	printf("\n3-Alternar pontos, gols e vitórias");
	printf("\n4-Alternar o nome de um artilheiro");
	printf("\n5-Informar time vencedor");
	printf("\n6-Informar o artilheiro com maior quantidade de gols");
	printf("\n7-Encerrar o programa");
	printf("\nDigite qual opção deseja: ");
	scanf("%i", &opt);
	switch (opt)
	{
		case 1: 
		RT(cod, nomeT);
		break;
		case 2:
		ZR(pts, vt, gl);
		break;
		case 3:
		ALT(cod, pts, vt, gl);
		break;
		case 4:
		ALTN(cod, nomeA);
		break;
		case 5:
		VC(pts, nomeT, nomeA);
		break;
		case 6:
		MG(gl, nomeA);
		break;
		case 7:
		printf("\nPrograma encerrado!");
		break;
		default:
			printf("\nNão é uma opção!");
			break;
	}
} while (opt!=7);
}
