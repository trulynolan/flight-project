import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Corrected import
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,              // Angular's CommonModule
    ReactiveFormsModule,        // Reactive forms module
    MatInputModule,            // Angular Material input module
    MatFormFieldModule,        // Angular Material form field module
    MatButtonModule,           // Angular Material button module
    MatSelectModule            // Angular Material select module
  ]
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup;
  airlines = ['American Airlines', 'Delta', 'United'];
  aircraftTypes = ['Boeing 737', 'Airbus A320', 'Boeing 777'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.flightForm = this.fb.group({
      originAirport: ['', Validators.required],
      destinationAirport: ['', Validators.required],
      departureDateTime: ['', Validators.required],
      arrivalDateTime: ['', Validators.required],
      airline: ['', Validators.required],
      flightNumber: ['', [Validators.required, Validators.pattern('[A-Z0-9]+')]],
      aircraftType: ['', Validators.required],
      availableSeats: [0, [Validators.required, Validators.min(1)]]  // Added availableSeats field
    });
  }

  ngOnInit(): void {
    this.flightForm.patchValue({
      airline: this.airlines[0],  // Default selected airline
      aircraftType: this.aircraftTypes[0]  // Default selected aircraft type
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      // Ensure the URL is correct
      this.http.post('http://localhost:3000/flights', this.flightForm.value).subscribe({
        next: (response: any) => console.log('Flight created successfully', response),
        error: (error: any) => console.error('Error creating flight', error)
      });
    }
  }
  
}
