import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.page.html',
  styleUrls: ['./seleccionar-fecha.page.scss'],
})
export class SeleccionarFechaPage implements OnInit {
  @Input() title: string;
  @Input() id: string
  @Input() fecha: Date
  today: Date = new Date();
  dateObjectReturn = {
    date: null,
    month: null,
    year: null
  }

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dias = []
  anos = []


  capitalizeFirstLetter(str) {


    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  constructor(
    public modalCtrl: ModalController
  ) { }


  ngOnInit() {

    if (this.fecha) {

      let day = this.fecha.getDate();
      let month = this.fecha.getMonth();
      let year = this.fecha.getFullYear();
      let monthName = this.capitalizeFirstLetter(this.fecha.toLocaleString('es-ES', { month: 'long' }))

      this.dateObjectReturn = {
        date: day,
        month: monthName,
        year: year

      }
      this.today = this.fecha;
      console.log('dateObjectReturn', this.dateObjectReturn)
    } else {

      let month = this.today.getMonth();
      let day = this.today.getDate();
      let year = this.today.getFullYear();
      let monthName = this.capitalizeFirstLetter(this.today.toLocaleString('es-ES', { month: 'long' }))
      this.dateObjectReturn = {
        date: day,
        month: monthName,
        year: year

      }

      console.log('dateObjectReturn', this.dateObjectReturn)

    }

    this.populateYears();

  }

  onChange() {

  }

  obtenerAno(event?) {
    if (event) {
      let ano = event.detail.value;
      this.dateObjectReturn.year = ano;
    } else {
      this.dateObjectReturn.year = this.dateObjectReturn.year;
    }
    this.obtenerMes(null);
    //this.populateYears()

  }
  obtenerMes(event?) {
    console.log('Obtiene mes');

    if (event) {
      let mes = event.detail.value;
      this.dateObjectReturn.month = mes;
    } else {
      let monthValue = this.capitalizeFirstLetter(this.today.toLocaleString('es-ES', { month: 'long' }))
      this.dateObjectReturn.month = this.dateObjectReturn.month;
    }

    console.log('this.dateObjectReturn', this.dateObjectReturn)
    this.populateDays();

  }
  obtenerDia(event?) {

    if (event) {

      let dia = event.detail.value;
      this.dateObjectReturn.date = dia;
    } else {
      this.dateObjectReturn.date = this.dateObjectReturn.date;
    }

    //this.populateDays();
  }
  populateDays() {
    this.dias = [];
    let monthValue = this.dateObjectReturn.month;


    console.log('monthValue', monthValue)
    let numeroDias = 0;



    if (monthValue === 'Enero' || monthValue === 'Mayo' || monthValue === 'Marzo' || monthValue === 'Julio' || monthValue === 'Agosto' || monthValue === 'Octubre' || monthValue === 'Diciembre') {
      numeroDias = 31;
    } else if (monthValue === 'Abril' || monthValue === 'Junio' || monthValue === 'Septiembre' || monthValue === 'Noviembre') {
      numeroDias = 30;
    }

    // CHECK FOR A LEAP YEAR     
    const leap = new Date(this.dateObjectReturn.year, 2, 0).getDate() === 29;

    if (leap) {
      if (monthValue === 'Febrero') {
        numeroDias = 28;
      }

    } else {
      if (monthValue === 'Febrero') {
        numeroDias = 29;
      }

    }




    //  INSERT THE CORRECT DAY INTO the dropdown
    this.dias = [];

    for (let i = 1; i <= numeroDias; i++) {

      this.dias.push(i);

      if (i == numeroDias - 1) {
        let dia = this.dias.findIndex(dia => dia == this.dateObjectReturn.date);

        if (dia >= 0) {
          this.dateObjectReturn.date = this.dias[dia]
        } else {
          this.dateObjectReturn.date = this.dias[0];
        }



      }


    }



  }



  cerrarModal() {
    this.modalCtrl.dismiss(this.modalCtrl.dismiss({
      'date': null
    }, null, this.id));
  }



  populateYears() {

    this.anos = [];

    // GET THE CURRENT YEAR AS A NUMBER
    let ano = this.today.getFullYear();
    // make the previous 100 yars be an option
    for (let i = 0; i < 101; i++) {

      this.anos.push(ano - i);

      if (i == 101 - 1) {
        this.obtenerMes();

      }


    }


  }
  getMonthDays(MonthYear, day) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var Value = MonthYear.split(" ");
    var month = (months.indexOf(Value[0]) + 1);
    return new Date(Value[1], month, day);
  }

  continuar() {
    let day = this.dateObjectReturn.date;
    let month = this.dateObjectReturn.month;
    let year = this.dateObjectReturn.year
    let completeDate = new Date(year, this.meses.indexOf(month), day)
   
 
    this.modalCtrl.dismiss({
      'date': completeDate
    });
  }



}
