import http from "../http";

function _getResultsAverages(results) {
  return results.reduce(
    (acc, result) => {
      acc.statuses[result.status] += 1;
      acc.total_duration += parseFloat(result.duration);
      acc.average_duration =
        Math.round((acc.total_duration * 100) / results.length) / 100;
      return acc;
    },
    {
      total_duration: 0.0,
      average_duration: 0.0,
      statuses: {
        ok: 0,
        failed: 0,
        skipped: 0,
        unreachable: 0,
        changed: 0,
        ignored: 0,
        unknown: 0,
      },
    }
  );
}
export function extractTasksFromPlays(hosts, plays, tasks, results) {
  return plays.reduce((acc, play) => {
    for (const task of tasks.filter(t => t.play === play.id)) {
      const taskResults = results.filter(r => r.task === task.id).map(r => ({ ...r, host_name: hosts.find(h => h.id === r.host).name }));
      const taskAverages = _getResultsAverages(taskResults);
      acc.push({
        name: task.name,
        action: task.action,
        results: taskResults,
        task_id: task.id,
        statuses: taskAverages.statuses,
        average_duration: taskAverages.average_duration,
      });
    }
    return acc;
  }, []);
}

export function getPlaybookTasks(play) {
  return (_, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/tasks?limit=999999999&playbook=${play.id}`);
  };
}
