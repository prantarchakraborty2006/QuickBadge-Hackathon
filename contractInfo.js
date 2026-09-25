export const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

export const CONTRACT_ABI = [
  "function collegeAdmin() view returns (address)",
  "function issueBadge(address _student, string _course, string _date)",
  "function verifyBadge(address _student) view returns (string courseName, string issueDate, bool exists)"
];