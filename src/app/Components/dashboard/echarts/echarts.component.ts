import { Component,ElementRef,Renderer2 ,ViewChild,Input} from '@angular/core';
import * as echarts from 'echarts';
import { Router } from '@angular/router';
import { HoneywellService } from 'src/app/Services/honeywell.service';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent {
  @Input() selectedZipCodes :any
  @Input() riskscores :any
  @Input() zipcodes :any
  viewbyzipcodeDetails:any=[]
  gauge: any;
  bar:any
  bar1:any
  linechart :any
  @ViewChild('exampleModal') exampleModal: any ;
  @ViewChild('exampleModal1') exampleModal1: any;
  @ViewChild('barchart1') barchart1: any ;
  constructor(private honeywellservice :HoneywellService, private router: Router, private renderer :Renderer2 ,private elementRef: ElementRef) {
   
   }
   openChart() {
    this.barChart1()
       setTimeout(()=>{
         this.barChart1();
       },1000);
   }
   closeModal(): void {
  
    this.exampleModal.nativeElement.classList.remove('show');
    document.body.classList.remove('modal-open'); 
    
    
  }
  closeModal1(): void {
  
    // this.exampleModal1.nativeElement.classList.remove('show');
    // document.body.classList.remove('modal-open');
    this.exampleModal1.hide();
  }
  ngOnInit() {
    this.gaugeChart();
    this.barChart();
    this.lineChart();
  }
  ngOnChanges(){
    console.log('selectedZipCodes',this.selectedZipCodes)
    console.log('riskscores',this.riskscores)
    console.log('zipcodes',this.zipcodes)
   
    }
  private gaugeChart(): void {
    this.gauge = echarts.init((document.getElementById('main')) as any);
  
    const 
    option = {
      series: [
        {
          type: 'gauge',
          max: 10,  // Set the maximum value of the gauge to 10
    
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#34CC33'],  // 0 to 1
                [0.7, '#F5FB53'],  // 1 to 9
                [1, '#DC483E']     // 9 to 10
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
            }
          },
          axisLabel: {
            show: true,
            distance: -20,  // Adjust the distance of the labels from the gauge
            textStyle: {
              color: '#fff',  // Set the color of the labels to black
              fontSize: 12      // Set the font size of the labels
            },
            formatter: function(value:any) {
              // Custom formatter to display only specific values
              if (value === 0 || value === 2 || value === 4 || value === 6 || value === 8 || value === 10) {
                return value;
              } else {
                return '';
              }
            }
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            color: 'inherit'
          },
          data: [
            {
              value: 5  // Set the initial value within the range of 0 to 10
            }
          ]
        }
      ]
    };
    
    
  
    this.gauge.setOption(option);
  
  
  }
  
  private lineChart():void{
    this.linechart = echarts.init((document.getElementById('analysis')) as any); 
    const 
    option = {
      dataset: {
        source: [
          ['RiskScore', 'Risk'],
          [20, 'Low Risk'],
          [50, 'Medium Risk'],
          [70, 'High Risk'],
        ]
      },
      xAxis: {
        type: 'value', // Set the type to 'value' for numerical x-axis
        name: '',
        axisLine: { // Customize axis line
          show: false // Show axis line
        },
        splitLine: { // Remove grid lines for x-axis
          show: false // Hide split lines
        },
        min: 10, // Set the minimum value of the x-axis
        max: 100, // Set the maximum value of the x-axis
        interval: 10 // Set the interval between each tick
      },
      yAxis: { 
        type: 'category',
        axisLine: { // Customize axis line
          show: false // Show axis line
        },
        axisTick: {
          show: false
        },
        splitLine: { // Remove grid lines for y-axis
          show: false // Hide split lines
        },
        axisLabel: {
          interval: 0,
          margin: 30, // Adjust margin to show full names
          rotate: 0, // Set rotation angle to 0 to show names horizontally
          textStyle: {
            color: '#fff', // Font color
            fontSize: 12, // Font size
            fontFamily:"Arial Rounded MT Bold" // Font family
          },
          formatter: function(value :any) {
            // Manually insert line breaks for long labels
            if (value.length > 50) { // Adjust the threshold based on your longest label
              return value.replace(/(.{10})/g, '$1\n'); // Insert line breaks after every 10 characters
            }
            return value;
          }
        }
      },
      grid: {
        right: '20%', // Adjust the right margin to accommodate long labels
        containLabel: true // Ensure that labels are contained within the chart area
      },
      series: [
        {
          type: 'bar',
          barWidth: 15,
          barGap: '10%', // Decrease the width of the bars
          encode: {
            x: 'RiskScore',
            y: 'Risk'
          },
          itemStyle: {
            color: function(params:any) {
              // Define colors based on the risk level
              if (params.value[1] === 'High Risk') {
                return '#DC2626'; // Red color for high risk
              } else if (params.value[1] === 'Medium Risk') {
                return '#FCDE9F'; // Orange color for medium risk
              } else {
                return '#7BDC9E'; // Green color for low risk
              }
            }
          },
          label: {
            show: true, // Show labels on the bars
            position: 'right', // Position labels to the right of the bars
            formatter: function(params:any) {
              // Display numerical value on the bars
              return params.value[0] + '%'; // Display the value as a percentage
            },
            textStyle: { // Customize label text style
              color: '#fff', // Set font color
              fontWeight: 'normal', // Set font weight to normal
              shadowBlur: 0, // Remove shadow
              shadowColor: 'transparent' // Make shadow transparent
            }
          }
        }
      ]
  };
  
    
    
    
    this.linechart.setOption(option);
  }
  private barChart(): void {
 
    this.bar = echarts.init((document.getElementById('barCharts')) as any);
    const originalDataset = [
      ['score', 'factorId'],
      [60, 'Fire Safety Complaint'],
      [32, 'Economic Factors'],
      [21, 'Population Density'],
      [19, 'Maintenance'],
      [12, 'Environment'],
  ];
  
  // Create a copy of the original dataset and sort it in descending order
  const sortedDataset = [...originalDataset.slice(1)] // Create a shallow copy and remove the header row
  .sort((a, b) => (b[0] as number) - (a[0] as number)) // Sort the dataset in descending order based on the score
      // Reverse the order of the dataset to display the highest value on top
  
  const top5Categories = sortedDataset.slice(0, 5); // Get the top 5 categories
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
      dataset: {
          source: [
              ['score', 'factorId'],
              ...top5Categories // Include only the top 5 categories in the dataset source
          ]
      },
      grid: { containLabel: true },
      xAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false }, // Ensure axis tick marks are hidden
          axisLabel: { show: false }, // Hide x-axis labels
          splitLine: { 
              show: false,
              lineStyle: {
                  color: 'grey' // Set the color of split lines to light color
              }
          }
      },
      yAxis: {
          type: 'category',
          axisTick: {
              show: false
          },
          axisLabel: {
              fontSize: 12,
              fontFamily: "Arial Rounded MT Bold",
              color:'#fff'
          },
      },
      series: [
          {
              type: 'bar',
              encode: {
                  x: 'score',
                  y: 'factorId'
              },
              barWidth: 10,
             barCategoryGap: '50%',
             // barGap:'50%',
              itemStyle: {
                  opacity: 0.7,
                  borderWidth: 2,
                  barBorderRadius: 5,
                  color: function(params:any) {
                      var value = params.value[0];
                      if (value === 60) {
                          return '#EF4444'; // Red for the highest value
                      } else if (value === 12) {
                          return '#34CC33'; // Green for the lowest value
                      } else {
                          return '#F5A623'; // Yellow for other values
                      }
                  }
              }
          }
      ],
  };
  
  
    this.bar.setOption(option);
  }
   
  private barChart1(): void {
    
  this.bar1 = echarts.init((document.getElementById('barchart1')) as any);
    //const bar1 = echarts.init(this.barchart1.nativeElement);
    const 
    option = {
      dataset: {
          source: [
              ['RiskScore', 'Risk'],
             
              [1, 'Facility Size(Area)'],
              [6, 'Environnement'],
              [5, 'Maintance'],
              [20, 'Population Density'],
              [23, 'Economic Factors'],
              [25, 'Fire Safety Compliance'],
               [1, 'Maintance Status'],
              [2, 'Population Density'],
              [4, 'Economic Factors'],
              [3, 'Devices'],
              [1, 'Windspeed'],
              [1, 'Temperature'],
              [3, 'Facility Type'],
          ]
      },
      xAxis: {
          name: 'RiskScore',
          show: false
      },
      yAxis: {
          type: 'category',
          axisTick: {
              show: false
          },
          axisLabel: {
              interval: 0,
              margin: 30,
              rotate: 0,
              textStyle: {
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: 'Arial, sans-serif'
              },
              formatter: function (value:any) {
                  // Manually insert line breaks for long labels
                  if (value.length > 50) { // Adjust the threshold based on your longest label
                      return value.replace(/(.{10})/g, '$1\n'); // Insert line breaks after every 10 characters
                  }
                  return value;
              }
          }
      },
      grid: {
          left: 200,
          show: false
      },
      series: [{
          type: 'bar',
          barWidth: '50%',
          label: {
              show: false
          },
          encode: {
              x: 'RiskScore',
              y: 'Risk'
          }
      }],
      tooltip: {
          formatter: function(params:any) {
              return 'RiskScore: ' + params.value[0] + '%'; // Display the RiskScore value as a percentage in the tooltip
          }
      }
  };
  
  // Sort the source data based on RiskScore in descending order
  option.dataset.source.sort(function(a, b) {
    return Number(b[0]) - Number(a[0]);
  });
  
  // Assign the sorted source back to the option
  option.dataset.source = option.dataset.source.slice(1); // Remove the header row before sorting
  
  // Now you can use the modified 'option' object for your chart configuration
  
    
    this.bar1.setOption(option);
  }
  
  newPage(){
    this.router.navigate(['/riskindex']);
  }
  
  getZipRiskScore(){
    const data ={
      zipCode : this.selectedZipCodes
      
    }
    console.log('zipcodevalue',this.selectedZipCodes)
    this.honeywellservice.getZipRiskScore(data).subscribe(response => {
      this.viewbyzipcodeDetails = response;
     this.riskscores= this.viewbyzipcodeDetails.riskScore
     this.zipcodes= this.viewbyzipcodeDetails.zipCodes
    //  this.zipcodeslength= this.zipcodes.length
  
      console.log('view by riskcores',this.riskscores)
      console.log('view by zipcode',this.zipcodes)
  
    });
  }
}

