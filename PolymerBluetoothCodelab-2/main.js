document.addEventListener('WebComponentsReady', function() {

  var batteryDevice = document.querySelector('platinum-bluetooth-device');
  var button = document.querySelector('paper-button');

  button.addEventListener('click', function() {
    console.log('Requesting a bluetooth device advertising a battery service...');
    
    batteryDevice.request().then(function(device) {
      console.log('A bluetooth device has been found!');
      console.log('Device Name: ' + device.name);
      
      // Connect to the device and read battery level.
      var batteryLevel = batteryDevice.querySelector('platinum-bluetooth-characteristic');
      console.log("Request battery level");
      return batteryLevel.read().then(function(value) {
        var data = new DataView(value);
        console.log('Battery Level is ' + data.getUint8(0) + '%');
      });
      
    })
    .catch(function(error) {
      console.error('Argh! ', error);
    });
  });
  
});