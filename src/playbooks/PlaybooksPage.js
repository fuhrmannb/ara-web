import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  Pagination,
  PageSection,
  PageSectionVariants,
  Title,
} from "@patternfly/react-core";
import { CubesIcon, ErrorCircleOIcon } from "@patternfly/react-icons";
import { LoadingPage } from "../pages";
import { fetchPlaybooks } from "./playbooksActions";
import PlaybookSummary from "./PlaybookSummary";

export class PlaybooksPage extends Component {
  state = {
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };

  refreshPlaybooks(page = 1, perPage = 100) {
    const { fetchPlaybooks, config } = this.props;
    fetchPlaybooks(page, perPage)
      // .catch((error) => {
      //   let errorMessage = "";
      //   if (error.response) {
      //     errorMessage = error.message;
      //   } else {
      //     errorMessage = `Server located at ${config.apiURL} is unreachable. Check your configuration. Verify that cross-origin requests are not blocked.`;
      //   }
      //   this.setState({ errorMessage, hasError: true });
      // })
      .then(() => this.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.refreshPlaybooks()
  }

  onSetPage(_, pageNumber) {
    const { playbooks } = this.props;
    this.refreshPlaybooks(pageNumber, playbooks.perPage)
  }

  onPerPageSelect(_, perPage) {
    const { playbooks } = this.props;
    this.refreshPlaybooks(playbooks.page, perPage)
  }

  render() {
    console.log(this.state)
    const { playbooks, history } = this.props;
    const { isLoading, hasError, errorMessage } = this.state;

    if (isLoading) {
      return <LoadingPage />;
    }

    if (!isLoading && hasError) {
      return (
        <PageSection variant={PageSectionVariants.default}>
          <Bullseye>
            <Card>
              <CardBody>
                <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={ErrorCircleOIcon} />
                  <Title headingLevel="h5" size="lg">
                    Error
                  </Title>
                  <EmptyStateBody>{errorMessage}</EmptyStateBody>
                </EmptyState>
              </CardBody>
            </Card>
          </Bullseye>
        </PageSection>
      );
    }

    if (!isLoading && playbooks.count === 0) {
      return (
        <PageSection variant={PageSectionVariants.default}>
          <Bullseye>
            <Card>
              <CardBody>
                <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={CubesIcon} />
                  <Title headingLevel="h5" size="lg">
                    No playbooks
                  </Title>
                  <EmptyStateBody>
                    No playbooks have been found when querying the ARA API
                    server.
                  </EmptyStateBody>
                  <Button
                    variant="primary"
                    component="a"
                    href="https://ara.readthedocs.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See documentation
                  </Button>
                </EmptyState>
              </CardBody>
            </Card>
          </Bullseye>
        </PageSection>
      );
    }

    return (
      <PageSection variant={PageSectionVariants.default}>
        <Pagination
          itemCount={this.playbooks.count}
          perPage={this.playbooks.perPage}
          page={this.playbooks.page}
          onSetPage={this.onSetPage}
          widgetId="pagination-options-menu-top"
          onPerPageSelect={this.onPerPageSelect}
        />
        {playbooks.data.map((playbook) => (
          <PlaybookSummary
            key={playbook.id}
            playbook={playbook}
            history={history}
          />
        ))}
      </PageSection>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config,
    playbooks: state.playbooks,
  };
}

const mapDispatchToProps = { fetchPlaybooks };

export default connect(mapStateToProps, mapDispatchToProps)(PlaybooksPage);
