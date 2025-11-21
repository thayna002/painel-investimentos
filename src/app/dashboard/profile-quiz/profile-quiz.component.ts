import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionModel } from '../../models/question.model';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-profile-quiz',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile-quiz.component.html',
  styleUrl: './profile-quiz.component.scss'
})
export class ProfileQuizComponent {

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {}

  currentIndex = 0;
  score = 0;

  // Perguntas do quiz
  questions: QuestionModel[] = [
    {
      id: 1,
      text: "Qual é o seu principal objetivo ao investir?",
      options: [
        { label: "Segurança e estabilidade", value: 0 },
        { label: "Equilíbrio entre segurança e retorno", value: 1 },
        { label: "Retornos altos assumindo riscos", value: 2 }
      ]
    },
    {
      id: 2,
      text: "Por quanto tempo pretende deixar o dinheiro investido?",
      options: [
        { label: "Menos de 1 ano", value: 0 },
        { label: "1 a 3 anos", value: 1 },
        { label: "Mais de 3 anos", value: 2 }
      ]
    },
    {
      id: 3,
      text: "Se seu investimento caísse 8% em um mês, o que faria?",
      options: [
        { label: "Venderia para evitar mais perdas", value: 0 },
        { label: "Manteria até recuperar", value: 1 },
        { label: "Aumentaria o investimento", value: 2 }
      ]
    }
  ];

  // Quando o usuário escolhe uma resposta
  selectOption(value: number) {
    this.score += value;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.finishQuiz();
    }
  }

  // Calcula Perfil com base no score
  get calculatedProfile(): string {
    if (this.score <= 2) return "Conservador";
    if (this.score <= 4) return "Moderado";
    return "Agressivo";
  }

  get profileDescription(): string {
    switch (this.calculatedProfile) {
      case "Conservador":
        return "Você prefere segurança e estabilidade nos seus investimentos.";
      case "Moderado":
        return "Você busca equilíbrio entre segurança e retorno.";
      case "Agressivo":
        return "Você aceita maiores riscos buscando maior rentabilidade.";
      default:
        return "";
    }
  }

  get profileScore(): number {
    return (this.score / (this.questions.length * 2)) * 100;
  }

  finishQuiz() {
    const result: ProfileModel = {
      clientId: Number(localStorage.getItem("clientId")),
      profile: this.calculatedProfile,
      description: this.profileDescription,
      score: Math.round(this.profileScore)
    };
   /* this.profileService.saveProfile(result).subscribe({
    next: () => {
    this.router.navigate(['/dashboard'], { state: { fromQuiz: true } });
      },
      error: (err) => {
        console.error("Erro ao salvar perfil:", err);
      }
    });*/
  }
}
