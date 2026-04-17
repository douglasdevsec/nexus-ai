import pytest
from backend.agents.analyst import analyst_agent
from backend.agents.remediator import remediator_agent

def test_analyst_agent():
    mock_raw_data = {"target": "192.168.1.5", "ports": [22, 80]}
    res = analyst_agent.analyze_findings(mock_raw_data, "network")
    assert "findings" in res
    assert isinstance(res["findings"], list)

def test_remediator_agent():
    mock_finding = {"title": "Open SSH Port", "severity": "medium", "description": "SSH is open on port 22"}
    res = remediator_agent.remediate_finding(mock_finding)
    assert "mitigation_steps" in res
    assert "impact" in res
