
window.onload = function (){
  IPInputs.init();
  registerEvents();
}

function registerEvents(){
  iprange.addEventListener('input', onIPRangeSlide);
  decimal_input.addEventListener('input', onDecimalInput);
  octetNodes.forEach(
    n => n.addEventListener('input', e => onOctetInput(e.target.dataset.octet, e.target.value))
  )
}

function onIPRangeSlide(e){
  // console.log(e.target.value);
  value = e.target.value; 
  IPInputs.value = value;
   
}

function onDecimalInput(e){
  value = e.target.value; 
  IPInputs.value = value;
}

function onOctetInput(){
  let value = IPAddress.dotDecimalToInt(IPInputs.dotDecimal);
  IPInputs.value = value; 
}

class IPInputs{

  static init(){
    globalThis.iprange = document.getElementById("iprange");
    globalThis.decimal_input = document.getElementById("decimal_ip");
    globalThis.bin_input = document.getElementById("bin_input");
    globalThis.dotdecimal_input = document.getElementById("dotted_decimal_input");
    globalThis.hex_input = document.getElementById("hex_input0x");
    globalThis.hex_input16 = document.getElementById("hex_input16");
    globalThis.octetNodes = document.querySelectorAll('#octets > div');
  }
  
  static set value(value){
    this.decimal = value; 
    this.range = value; 
    this.bin = value; 
    this.hex = value; 
    this.dotDecimal = value; 
  }
  
  static set decimal(value){
    decimal_input.value = value;
  }
  
  static set range(value){
    iprange.value = value; 
  }

  static set bin(value){
    let binvalue = IPAddress.decimalToBin(value);
    bin_input.value = binvalue;
  }

  static set hex(value){
    let hex_value = IPAddress.decimalToHex(value);
    hex_input.value = `0X${hex_value}`;
    hex_input16.innerHTML = `${hex_value}<sub>16</sub>`
  }

  static get dotDecimal(){
    return Array.from(octetNodes).map(e => e.firstElementChild.value).join('.');
  }

  static set dotDecimal(value){
      let dotdstr = IPAddress.int2dotDecimal(value);
      let octets = dotdstr.split('.');
      document.querySelectorAll("#octets > div").forEach(
        (octet, i) => octet.firstElementChild.value = octets[i]
      )
  }

  static setOctet(num, value){

  }

  
}

class IPAddress {
 
  constructor(ipaddress){
    //TODO: Validate IP 
    this.dotdecimal = ipaddress;
  }
 
  static isValid(ipaddress){
    ;; 
  }

  static dotDecimalToInt(ip) {
    return ip.split('.').reduce(
      function(ipInt, octet) { 
        return (ipInt<<8) + parseInt(octet, 10)
      }, 0
      ) >>> 0;

  }

  static int2dotDecimal(ipDec) {
    return `${ipDec >>> 24}.${ipDec >> 16 & 255}.${ipDec >> 8 & 255}.${ipDec & 255}`; 
  }

  static decimalToBin(value, space=true){
    value = parseInt(value);
    let v =  value.toString(2);
    v = v.padStart(32, 0);
    if (space) {
      v = v.match(/.{1,8}/g).join(" ");
    }
    return v; 
  }

  static decimalToHex(value){
    let hex = parseInt(value).toString(16).toUpperCase();
    return hex; 
  }



}



