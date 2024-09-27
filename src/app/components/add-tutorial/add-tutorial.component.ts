import { Component } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    fname: '',
    lname: '',
    username: '',
    email: '',
    avatar: '',
  };
  submitted = false;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveTutorial(): void {
    const data = {
      fname: this.tutorial.fname,
      lname: this.tutorial.lname,
      username: this.tutorial.username,
      email: this.tutorial.email,
      avatar: this.tutorial.avatar,
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        // console.log(res);
        this.submitted = true;
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e),
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      fname: '',
      lname: '',
      username: '',
      email: '',
      avatar: '',
    };
  }
}
