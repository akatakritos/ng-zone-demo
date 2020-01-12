import { Pythagoras } from './pythagoras';

export class PythagoranZoneSpec implements ZoneSpec {
  name: string;
  hasMicroTask: boolean;

  constructor() {
    this.name = 'PythagoranZone';
    this.hasMicroTask = false;
  }

  onHasTask(delegate: ZoneDelegate, current: Zone, target: Zone, hasTaskState: HasTaskState) {
    this.hasMicroTask = hasTaskState.microTask;
    if (!this.hasMicroTask) {
      Pythagoras.triggerDigest();
    }
  }

  onInvokeTask(
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    task: Task,
    applyThis: any,
    applyArgs?: any[]
  ) {
    try {
      return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
    } finally {
      if (!this.hasMicroTask) {
        Pythagoras.triggerDigest();
      }
    }
  }
}
