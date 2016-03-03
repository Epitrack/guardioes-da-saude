'use strict';

describe('Service: Notification', function () {

  // load the service's module
  beforeEach(module('gdsApp'));

  // instantiate service
  var Notification;
  beforeEach(inject(function (_Notification_) {
    Notification = _Notification_;
  }));

  it('should do something', function () {
    expect(!!Notification).toBe(true);
  });

});
