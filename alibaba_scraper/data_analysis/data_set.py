from subprocess import run


def json_catalog(_search, _range):
    result_json = run(['node', './index.js', str(_search), str(_range)], capture_output=True)

    return result_json.stdout.decode('utf-8')

