$(function () {
  var $from = $('#from_wrap');
  var $to = $('#to_wrap');
  $from.datetimepicker();
  $to.datetimepicker({
    useCurrent: false
  });
  $from.on("dp.change", function (e) {
    $to.data("DateTimePicker").minDate(e.date);
  });
  $to.on("dp.change", function (e) {
    $from.data("DateTimePicker").maxDate(e.date);
  });
  
  var url = 'http://www.google.com/calendar/event?action=TEMPLATE';
  var $form = $('form');
  $form.on('submit', function(event){
    event.preventDefault();
    var form = $form.serializeArray().reduce(function(result, field, index){
      result[field.name] = field.value;
      return result;
    }, {});
    var urlResult = Object.keys(form).reduce(function(url, fieldName, index){
      var value = form[fieldName];
      if (!value) return url;
      if (fieldName === 'from' || fieldName === 'to') {
        value = moment(value);
        value = value.format('YYYYMMDD') + 'T' + value.format('HHmmss')
      }
      return '{0}&{1}={2}'
      .replace('{0}', url)
      .replace('{1}', fieldName)
      .replace('{2}', value);
    }, url);
    $('#result').text(urlResult).attr('href', urlResult);
  });
});