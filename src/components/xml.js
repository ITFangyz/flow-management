export default {
    xml:`<?xml version="1.0" encoding="UTF-8"?>
    <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="diagram_Process_1657595459411" targetNamespace="http://flowable.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
      <bpmn2:process id="Process_1657595459411" name="业务流程_1657595459411" isExecutable="true">
        <bpmn2:startEvent id="Event_1je1gnj">
          <bpmn2:outgoing>Flow_054e8cw</bpmn2:outgoing>
        </bpmn2:startEvent>
        <bpmn2:userTask id="Activity_1vmxfki">
          <bpmn2:incoming>Flow_054e8cw</bpmn2:incoming>
          <bpmn2:outgoing>Flow_1l3a9ep</bpmn2:outgoing>
        </bpmn2:userTask>
        <bpmn2:sequenceFlow id="Flow_054e8cw" sourceRef="Event_1je1gnj" targetRef="Activity_1vmxfki" />
        <bpmn2:userTask id="Activity_0mc9qrn">
          <bpmn2:incoming>Flow_1l3a9ep</bpmn2:incoming>
          <bpmn2:outgoing>Flow_0j6jykh</bpmn2:outgoing>
        </bpmn2:userTask>
        <bpmn2:sequenceFlow id="Flow_1l3a9ep" sourceRef="Activity_1vmxfki" targetRef="Activity_0mc9qrn" />
        <bpmn2:endEvent id="Event_12nfrrp">
          <bpmn2:incoming>Flow_0j6jykh</bpmn2:incoming>
        </bpmn2:endEvent>
        <bpmn2:sequenceFlow id="Flow_0j6jykh" sourceRef="Activity_0mc9qrn" targetRef="Event_12nfrrp" />
      </bpmn2:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1657595459411">
          <bpmndi:BPMNEdge id="Flow_054e8cw_di" bpmnElement="Flow_054e8cw">
            <di:waypoint x="288" y="180" />
            <di:waypoint x="340" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1l3a9ep_di" bpmnElement="Flow_1l3a9ep">
            <di:waypoint x="440" y="180" />
            <di:waypoint x="500" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0j6jykh_di" bpmnElement="Flow_0j6jykh">
            <di:waypoint x="600" y="180" />
            <di:waypoint x="662" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Event_1je1gnj_di" bpmnElement="Event_1je1gnj">
            <dc:Bounds x="252" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1vmxfki_di" bpmnElement="Activity_1vmxfki">
            <dc:Bounds x="340" y="140" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0mc9qrn_di" bpmnElement="Activity_0mc9qrn">
            <dc:Bounds x="500" y="140" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_12nfrrp_di" bpmnElement="Event_12nfrrp">
            <dc:Bounds x="662" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn2:definitions>
    
    designer.vue?d4c2:173 保存时流程数据 <?xml version="1.0" encoding="UTF-8"?>
    <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="diagram_Process_1657595459411" targetNamespace="http://flowable.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
      <bpmn2:process id="Process_1657595459411" name="业务流程_1657595459411" isExecutable="true">
        <bpmn2:startEvent id="Event_1je1gnj">
          <bpmn2:outgoing>Flow_054e8cw</bpmn2:outgoing>
        </bpmn2:startEvent>
        <bpmn2:userTask id="Activity_1vmxfki">
          <bpmn2:incoming>Flow_054e8cw</bpmn2:incoming>
          <bpmn2:outgoing>Flow_1l3a9ep</bpmn2:outgoing>
        </bpmn2:userTask>
        <bpmn2:sequenceFlow id="Flow_054e8cw" sourceRef="Event_1je1gnj" targetRef="Activity_1vmxfki" />
        <bpmn2:userTask id="Activity_0mc9qrn">
          <bpmn2:incoming>Flow_1l3a9ep</bpmn2:incoming>
          <bpmn2:outgoing>Flow_0j6jykh</bpmn2:outgoing>
        </bpmn2:userTask>
        <bpmn2:sequenceFlow id="Flow_1l3a9ep" sourceRef="Activity_1vmxfki" targetRef="Activity_0mc9qrn" />
        <bpmn2:endEvent id="Event_12nfrrp">
          <bpmn2:incoming>Flow_0j6jykh</bpmn2:incoming>
        </bpmn2:endEvent>
        <bpmn2:sequenceFlow id="Flow_0j6jykh" sourceRef="Activity_0mc9qrn" targetRef="Event_12nfrrp" />
      </bpmn2:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1657595459411">
          <bpmndi:BPMNEdge id="Flow_054e8cw_di" bpmnElement="Flow_054e8cw">
            <di:waypoint x="288" y="180" />
            <di:waypoint x="340" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1l3a9ep_di" bpmnElement="Flow_1l3a9ep">
            <di:waypoint x="440" y="180" />
            <di:waypoint x="500" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0j6jykh_di" bpmnElement="Flow_0j6jykh">
            <di:waypoint x="600" y="180" />
            <di:waypoint x="662" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNShape id="Event_1je1gnj_di" bpmnElement="Event_1je1gnj">
            <dc:Bounds x="252" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1vmxfki_di" bpmnElement="Activity_1vmxfki">
            <dc:Bounds x="340" y="140" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0mc9qrn_di" bpmnElement="Activity_0mc9qrn">
            <dc:Bounds x="500" y="140" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_12nfrrp_di" bpmnElement="Event_12nfrrp">
            <dc:Bounds x="662" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn2:definitions>`
}